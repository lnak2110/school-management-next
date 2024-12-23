import Link from "next/link";
import { StudentType } from "@/lib/types";

type StudentsTableProps = {
  students: StudentType[];
  children?: React.ReactNode;
  handleDelete?: (id: number, name: string) => void;
};

export default function StudentsTable({
  students,
  children,
  handleDelete,
}: StudentsTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border shadow-sm">
      <table className="w-full table-auto text-left text-sm">
        <thead className="border-b bg-gray-50 font-medium text-gray-600">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Class</th>
            <th className="px-6 py-3">{children}</th>
          </tr>
        </thead>
        <tbody className="divide-y text-gray-600">
          {students.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.className}</td>
              <td className="whitespace-nowrap px-6 text-right">
                <Link
                  href={`/students/${item.id}`}
                  className="rounded-lg px-3 py-2 font-medium text-indigo-600 duration-150 hover:bg-gray-50 hover:text-indigo-500"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete?.(item.id, item.name)}
                  className="rounded-lg px-3 py-2 font-medium leading-none text-red-600 duration-150 hover:bg-gray-50 hover:text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
