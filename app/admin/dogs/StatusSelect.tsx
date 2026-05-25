"use client";

export default function StatusSelect({ id, status, action }: { id: number; status: string; action: (fd: FormData) => Promise<void> }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.target.form?.requestSubmit()}
        className={`text-xs px-2 py-1 rounded-full font-bold border-0 cursor-pointer ${status === "Available" ? "bg-green-100 text-green-800" : status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"}`}
      >
        <option value="Available">Available</option>
        <option value="Pending">Pending</option>
        <option value="Adopted">Adopted</option>
      </select>
    </form>
  );
}
