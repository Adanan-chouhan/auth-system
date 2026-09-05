"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface UsersResponse {
  statusCode: number;
  message: string;
  data: User[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [seach,setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const result: UsersResponse = await response.json();

        setUsers(result.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

const filteredUsers = users.filter((user) => {
  return user.fullName.toLowerCase().includes(seach.toLowerCase());
})

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Users
        </h1>

        <input
          type="text"
          placeholder="Search users..."
          value={seach}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">ID</th>
              </tr>
            </thead>

            <tbody>
             {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {user.fullName}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
} 