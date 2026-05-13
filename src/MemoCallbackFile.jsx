import { memo, useCallback, useMemo, useState } from "react";

import "./MemoCallbackFile.css";

/**
 * بيانات تجريبية تشبه طلبات من متجر / نظام ERP
 * (في الشغل الحقيقي تجي من API)
 */
const RAW_ORDERS = [
  {
    id: "ORD-1001",
    customer: "أحمد علي",
    status: "pending",
    total: 120.5,
    date: "2026-05-01",
  },
  {
    id: "ORD-1002",
    customer: "سارة محمد",
    status: "shipped",
    total: 89.0,
    date: "2026-05-02",
  },
  {
    id: "ORD-1003",
    customer: "خالد يوسف",
    status: "pending",
    total: 340.25,
    date: "2026-05-03",
  },
  {
    id: "ORD-1004",
    customer: "ليلى حسن",
    status: "cancelled",
    total: 45.0,
    date: "2026-05-03",
  },
  {
    id: "ORD-1005",
    customer: "محمود فهد",
    status: "shipped",
    total: 512.0,
    date: "2026-05-04",
  },
  {
    id: "ORD-1006",
    customer: "نورا سعيد",
    status: "pending",
    total: 67.99,
    date: "2026-05-05",
  },
  {
    id: "ORD-1007",
    customer: "طارق نبيل",
    status: "shipped",
    total: 210.0,
    date: "2026-05-05",
  },
];

const STATUS_LABEL = {
  pending: "قيد المعالجة",
  shipped: "تم الشحن",
  cancelled: "ملغي",
};

function heavyFilterAndSort(orders, search, statusFilter, sortBy) {
  // محاكاة عمل مكلف (فرز/فلترة آلاف السجلات، استدعاءات، إلخ)
  const normalized = search.trim().toLowerCase();

  let list = orders.filter((order) => {
    const matchText =
      !normalized ||
      order.id.toLowerCase().includes(normalized) ||
      order.customer.toLowerCase().includes(normalized);
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchText && matchStatus;
  });

  list = [...list].sort((a, b) => {
    if (sortBy === "total_desc") return b.total - a.total;
    if (sortBy === "total_asc") return a.total - b.total;
    if (sortBy === "date_desc") return b.date.localeCompare(a.date);
    return a.date.localeCompare(b.date);
  });

  return list;
}

/** إحصاءات مختصرة للـ KPI من القائمة المصفّاة (تعتمد على نفس مدخلات useMemo) */
function summarizeFiltered(orders) {
  const count = orders.length;
  const sum = orders.reduce((acc, o) => acc + o.total, 0);
  const avg = count ? sum / count : 0;
  return { count, sum, avg };
}

/**
 * صفّ معزول بـ memo: يُعاد رسمه فقط إذا تغيّرت الخصائص (أو مرجع الدالة المرسلة من الأب).
 * مع useCallback ثابت للـ toggle، طيّ صف لا يفرض إعادة رسم باقي الصفوف.
 */
const OrderRow = memo(function OrderRow({ order, expanded, onToggleExpand }) {
  console.log("re-render row", order.id);

  return (
    <li className="mcf-list-item">
      <button
        type="button"
        className={`mcf-row-button${expanded ? " mcf-row-button--open" : ""}`}
        onClick={() => onToggleExpand(order.id)}
      >
        <strong>{order.id}</strong> — {order.customer} —{" "}
        {STATUS_LABEL[order.status]} — {order.total.toFixed(2)} د.ل — {order.date}
        <span className="mcf-chevron">{expanded ? "▼" : "▶"}</span>
      </button>
      {expanded && (
        <div className="mcf-details">
          تفاصيل إضافية (مثال UI): يمكن هنا عناصر نموذج أو أزرار إجراءات دون إعادة
          رسم كل الصفوف بفضل <code>memo</code> و<code>useCallback</code>.
        </div>
      )}
    </li>
  );
});

export default function MemoCallbackFile() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");

  /** حالة UI تتغير كثيراً ومستقلّة عن الفلترة — مرجع الدالة ثابت يحمي صفوف memo */
  const [expandedId, setExpandedId] = useState(null);

  const filteredOrders = useMemo(() => {
    console.log("re-render filter");
    return heavyFilterAndSort(RAW_ORDERS, search, statusFilter, sortBy);
  }, [search, statusFilter, sortBy]);

  const stats = useMemo(
    () => summarizeFiltered(filteredOrders),
    [filteredOrders],
  );

  /** نفس المنطق بدون اعتماد على expandedId في التبعيات → مرجع مستقر عبر كل إعادة رسم للأب */
  const handleToggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  console.log("re-render page");
  return (
    <div className="mcf-root">
      <h2 className="mcf-title">لوحة الطلبات — useCallback</h2>
      <p className="mcf-intro">
        الصفوف ملفوفة بـ <code>memo</code>. لو مرّرنا دالة طيّ جديدة كل رسم (`inline`)
        ستُعاد رسم كل الصفوف عند أي تحديث للأب (مثل تغيّر{" "}
        <code>expandedId</code>). <code>useCallback</code> يثبت مرجع{" "}
        <code>handleToggleExpand</code> فيبقى الفرق بين الصفوف في الرسم هو من يغيّر{" "}
        <code>expanded</code> فقط؛ راقب في الطرفية <code>re-render row</code> مقابل{" "}
        <code>re-render page</code>.
      </p>

      <div className="mcf-form-grid">
        <div>
          <label htmlFor="mcf-search" className="mcf-label">
            بحث (رقم الطلب أو اسم العميل)
          </label>
          <input
            id="mcf-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="مثال: أحمد أو ORD"
            className="mcf-input"
          />
        </div>
        <div>
          <label htmlFor="mcf-status" className="mcf-label">
            الحالة
          </label>
          <select
            id="mcf-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mcf-select"
          >
            <option value="all">الكل</option>
            <option value="pending">قيد المعالجة</option>
            <option value="shipped">تم الشحن</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
        <div className="mcf-form-row-full">
          <label htmlFor="mcf-sort" className="mcf-label">
            ترتيب
          </label>
          <select
            id="mcf-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mcf-select"
          >
            <option value="date_desc">التاريخ (الأحدث أولاً)</option>
            <option value="date_asc">التاريخ (الأقدم أولاً)</option>
            <option value="total_desc">المبلغ (من الأعلى)</option>
            <option value="total_asc">المبلغ (من الأقل)</option>
          </select>
        </div>
      </div>

      <section className="mcf-stats">
        <strong>إحصاءات من القائمة الحالية:</strong> {stats.count} طلب — المجموع{" "}
        {stats.sum.toFixed(2)} — المتوسط {stats.avg.toFixed(2)} (محسوب بـ
        useMemo من <code>filteredOrders</code>)
      </section>

      <ul className="mcf-list">
        {filteredOrders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            expanded={expandedId === order.id}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </ul>

      {filteredOrders.length === 0 && (
        <p className="mcf-empty">لا توجد نتائج مطابقة للبحث أو التصفية.</p>
      )}
    </div>
  );
}
