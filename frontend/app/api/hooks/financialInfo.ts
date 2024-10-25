// import useSWR from "swr";
// import { fetcher } from "../utility/api";
// import { UserFinancialInfo } from "@/app/interface/userInterface";

// export const useFinancialInfo = (userId: number | null) => {  
//   // Use SWR to fetch user information
//   const { data, error, isValidating }: SWRResponse<{ userFinancialInfo: UserFinancialInfo }> = useSWR(
//     userId ? `/userInfo/${userId}` : null,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//     }
//   );  

//   return {
//     userFinancialInfo: data?.userFinancialInfo,
//     isLoading: !data && !error && isValidating,
//     isError: error,
//   };
// };
