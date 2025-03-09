import ListsTab from "@/app/lists/listsTab";
import {fetchCurrentUserLikeIds, fetchLikedMembers} from "@/app/actions/likeActions";

export default async function ListsPage({searchParams}: {searchParams: Promise<{type: string}>}) {

    const {type} = await searchParams;

    const likeIds = await fetchCurrentUserLikeIds();
    const members = await fetchLikedMembers(type)

    return (
        <div>
            <ListsTab members={members} likeIds={likeIds} />
        </div>
    );
}
