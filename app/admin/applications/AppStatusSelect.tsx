"use client";

export default function AppStatusSelect({ id, status, action }: { id: number; status: string; action: (fd: FormData) => Promise<void> }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.target.form?.requestSubmit()}
        className={`text-xs px-3 py-1 rounded-full font-bold border-0 cursor-pointer ${status === "Approved" ? "bg-green-100 text-green-800" : status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-800"}`}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </form>
  );
}
