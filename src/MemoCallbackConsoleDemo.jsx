import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * ========== useMemo ==========
 * السؤال: متى تعيد حساب القيمة؟
 * الجواب: فقط عندما يتغيّر `n`.
 *
 * للطلّاب: `renderOnly` يغيّر الرسم فقط؛ لن ترى ▶ للحساب.
 * عند تغيّر `n` فقط تُعاد عملية ضرب وتظهر ▶.
 */
function UseMemoConsoleDemo() {
  const [renderOnly, setRenderOnly] = useState(0);
  const [n, setN] = useState(1);

  const doubled = useMemo(() => {
    console.log("▶ useMemo: إعادة حساب (n × 2) حيث n =", n);
    return n * 2;
  }, [n]);

  useEffect(() => {
    const step1 = window.setTimeout(() => {
      console.log("\n[1] زدنا renderOnly فقط → رسم جديد بدون ▶ حساب");
      setRenderOnly((prev) => prev + 1);
    }, 5000);
    const step2 = window.setTimeout(() => {
      console.log("\n[2] زدنا n → متوقّع ظهور ▶ لإعادة الحساب");
      setN((prev) => prev + 1);
    }, 10000);
    return () => {
      window.clearTimeout(step1);
      window.clearTimeout(step2);
    };
  }, []);

  console.log("render | renderOnly =", renderOnly, "| doubled =", doubled);

  return null;
}

/**
 * ========== useCallback ==========
 * السؤال: متى تصير الدالة «جديدة» (مرجع جديد)؟
 * الجواب: فقط عندما يتغيّر `m`.
 *
 * للطلّاب: useMemo يحفظ نتيجة؛ useCallback يحفظ نفس الدالة (المرجع).
 * نتابع هوية الدالة بـ useEffect([onClick]).
 */

export function UseCallbackConsoleDemo() {
  const [renderOnly, setRenderOnly] = useState(0);
  const [num, setNum] = useState(0);

  const onClick = useCallback(() => {
    console.log("▶ استدعاء الدالة (أُنشئت مع num =", num, ")");
  }, [num]);

  useEffect(() => {
    console.log("▶ هوية الدالة تغيّرت (useCallback أعاد إنشاء الدالة)");
  }, [onClick]);

  useEffect(() => {
    const step1 = window.setTimeout(() => {
      console.log("\n[1] زدنا renderOnly فقط → لا ▶ لهوية الدالة");
      setRenderOnly((x) => x + 1);
    }, 1000);
    const step2 = window.setTimeout(() => {
      console.log("\n[2] زدنا m → متوقّع ▶ واحد: هوية جديدة");
      setNum((x) => x + 1);
    }, 2000);
    return () => {
      window.clearTimeout(step1);
      window.clearTimeout(step2);
    };
  }, []);

  console.log("render | renderOnly =", renderOnly, "| m =", num);

  return null;
}

/** التجربتان معًا؛ للشرح خطوة بخطوة علّق أحد المكوّنين في App. */
export default function MemoCallbackConsoleDemos() {
  return (
    <>
      {/* <UseMemoConsoleDemo /> */}
      <UseCallbackConsoleDemo />
    </>
  );
}
