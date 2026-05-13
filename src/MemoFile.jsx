import { useMemo, useState } from "react";

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

export default function MemoFile() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");

  /** حالة UI تتغير كثيراً ومستقلّة عن البيانات — بدون useMemo كان الفلتر/الفرز يعاد كل مرة */
  const [expandedId, setExpandedId] = useState(null);

  const filteredOrders = useMemo(() => {
    console.log("re-render in useMemo");
    return heavyFilterAndSort(RAW_ORDERS, search, statusFilter, sortBy);
  }, [search, statusFilter, sortBy]);

  const stats = useMemo(
    () => summarizeFiltered(filteredOrders),
    [filteredOrders],
  );

  console.log("re-render page");
  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: 720,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ marginTop: 0 }}>لوحة الطلبات — useMemo</h2>
      <p style={{ color: "#444", fontSize: 14 }}>
        الفلترة والفرز ثقيلة؛ نُعيد حساب النتيجة فقط عندما يتغيّر البحث، الحالة،
        أو نوع الفرز. طيّ الصفوف يغيّر <code>expandedId</code> فقط فلا يُعاد
        تشغيل <code>heavyFilterAndSort</code>.
      </p>

      <div
        style={{
          display: "grid",
          gap: 12,
          marginBottom: 16,
          gridTemplateColumns: "1fr auto",
          alignItems: "end",
        }}
      >
        <div>
          <label
            htmlFor="memo-search"
            style={{ display: "block", fontSize: 13, marginBottom: 4 }}
          >
            بحث (رقم الطلب أو اسم العميل)
          </label>
          <input
            id="memo-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="مثال: أحمد أو ORD"
            style={{ width: "100%", padding: "8px 10px" }}
          />
        </div>
        <div>
          <label
            htmlFor="memo-status"
            style={{ display: "block", fontSize: 13, marginBottom: 4 }}
          >
            الحالة
          </label>
          <select
            id="memo-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "8px 10px" }}
          >
            <option value="all">الكل</option>
            <option value="pending">قيد المعالجة</option>
            <option value="shipped">تم الشحن</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label
            htmlFor="memo-sort"
            style={{ display: "block", fontSize: 13, marginBottom: 4 }}
          >
            ترتيب
          </label>
          <select
            id="memo-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "8px 10px" }}
          >
            <option value="date_desc">التاريخ (الأحدث أولاً)</option>
            <option value="date_asc">التاريخ (الأقدم أولاً)</option>
            <option value="total_desc">المبلغ (من الأعلى)</option>
            <option value="total_asc">المبلغ (من الأقل)</option>
          </select>
        </div>
      </div>

      <section
        style={{
          padding: "10px 12px",
          background: "#f4f6f8",
          borderRadius: 8,
          marginBottom: 16,
          fontSize: 14,
        }}
      >
        <strong>إحصاءات من القائمة الحالية:</strong> {stats.count} طلب — المجموع{" "}
        {stats.sum.toFixed(2)} — المتوسط {stats.avg.toFixed(2)} (محسوب بـ
        useMemo من <code>filteredOrders</code>)
      </section>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filteredOrders.map((order) => {
          const open = expandedId === order.id;
          return (
            <li
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                marginBottom: 8,
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => setExpandedId(open ? null : order.id)}
                style={{
                  width: "100%",
                  textAlign: "start",
                  padding: "10px 12px",
                  background: open ? "#eef6ff" : "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                <strong>{order.id}</strong> — {order.customer} —{" "}
                {STATUS_LABEL[order.status]} — {order.total.toFixed(2)} د.ل —{" "}
                {order.date}
                <span style={{ float: "inline-end", color: "#666" }}>
                  {open ? "▼" : "▶"}
                </span>
              </button>
              {open && (
                <div
                  style={{
                    padding: "8px 12px 12px",
                    fontSize: 13,
                    color: "#333",
                  }}
                >
                  تفاصيل إضافية (مثال UI): يمكن هنا عناصر نموذج أو أزرار إجراءات
                  دون إعادة فلترة كل الطلبات.
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {filteredOrders.length === 0 && (
        <p style={{ color: "#666" }}>لا توجد نتائج مطابقة للبحث أو التصفية.</p>
      )}
    </div>
  );
}
