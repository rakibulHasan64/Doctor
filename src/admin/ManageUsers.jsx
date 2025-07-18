import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useState } from 'react';

function ManageUsers() {
   const axiosSecure = useAxiosSecure();
   const queryClient = useQueryClient();
   const [successMessage, setSuccessMessage] = useState(null);
   const [errorMessage, setErrorMessage] = useState(null);

   const fetchUsers = async () => {
      try {
         const res = await axiosSecure.get('/users');
         return res.data;
      } catch (error) {
         console.log(error);
         
         throw new Error('Failed to fetch users');
      }
   };

   const { data: users, isLoading, isError, error } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
   });

   const mutation = useMutation({
      mutationFn: ({ email, role }) =>
         axiosSecure.patch(`/users/${email}/role`, { role }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['users'] });
         setSuccessMessage('User role updated successfully!');
         setTimeout(() => setSuccessMessage(null), 3000);
      },
      onError: () => {
         setErrorMessage('Failed to update user role');
         setTimeout(() => setErrorMessage(null), 3000);
      }
   });

   if (isLoading) return (
      <div className="flex justify-center items-center min-h-screen">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
   );

   if (isError) return (
      <div className="p-4 max-w-4xl mx-auto">
         <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error loading users: {error.message}</span>
         </div>
      </div>
   );

   if (!Array.isArray(users)) return (
      <div className="p-4 max-w-4xl mx-auto">
         <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Invalid users data received</span>
         </div>
      </div>
   );

   return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
         <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Users</h1>
            <p className="text-gray-600 mt-2">Update user roles and permissions</p>
         </div>

         {successMessage && (
            <div className="alert alert-success mb-6 transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span>{successMessage}</span>
            </div>
         )}

         {errorMessage && (
            <div className="alert alert-error mb-6 transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span>{errorMessage}</span>
            </div>
         )}

         <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                     <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Current Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Change Role
                        </th>
                     </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {users?.map((user) => (
                        <tr key={user.email} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{user.email}</div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                    user.role === 'seller' ? 'bg-blue-100 text-blue-800' :
                                       'bg-green-100 text-green-800'}`}>
                                 {user.role}
                              </span>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                 className="select select-bordered select-sm w-full max-w-xs"
                                 value={user.role}
                                 onChange={(e) => {
                                    mutation.mutate({ email: user.email, role: e.target.value });
                                 }}
                                 disabled={mutation.isPending}
                              >
                                 <option value="user">User</option>
                                 <option value="seller">Seller</option>
                                 <option value="admin">Admin</option>
                              </select>
                              {mutation.isPending && (
                                 <span className="loading loading-spinner loading-xs ml-2"></span>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {users?.length === 0 && (
            <div className="text-center py-12">
               <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
               <h3 className="mt-2 text-sm font-medium text-gray-900">No users</h3>
               <p className="mt-1 text-sm text-gray-500">There are currently no users to display.</p>
            </div>
         )}
      </div>
   );
}

export default ManageUsers;