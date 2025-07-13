import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_API_END_POINT } from "../../utils/Constant";

function ShowAllUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/alluser`);
        const fetchedUsers = response.data.users;

        if (fetchedUsers.length === 0) {
          throw new Error("No users available");
        }

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 my-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Registered Users
      </h1>
      <div className="overflow-x-auto">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left text-sm sm:text-base">
                  S.NO
                </th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">
                  StdId
                </th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm sm:text-base">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 text-sm sm:text-base">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm sm:text-base">
                      {user.stdId}
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={
                          user.profileImage || "https://via.placeholder.com/50"
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm sm:text-base">
                      {user.name}
                    </td>
                    <td className="px-4 py-2 text-sm sm:text-base">
                      {user.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-sm sm:text-base"
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ShowAllUser;
