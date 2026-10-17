import { useQuery} from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";

export function useAddTransaction()  {

    const members = useQuery({
        queryKey: ["category"],
        queryFn: () => transactionService.getMembers(),
        retry: 2
    });

    return {members};
}