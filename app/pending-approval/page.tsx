import Link from "next/link";

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-3">Pending Approval / 待审批</h2>
        <p className="text-amber-700 mb-2">Your shelter account is awaiting admin approval.</p>
        <p className="text-amber-700 mb-6">您的收容所账户正在等待管理员审批。</p>
        <p className="text-sm text-amber-500 mb-6">We'll notify you by email once approved. / 审批通过后我们将通过邮件通知您。</p>
        <Link href="/" className="bg-amber-600 text-white px-6 py-2 rounded-full font-bold hover:bg-amber-700">Back to Home / 返回首页</Link>
      </div>
    </div>
  );
}
