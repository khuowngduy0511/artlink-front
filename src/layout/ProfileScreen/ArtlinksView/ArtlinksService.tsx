import { axiosPrivate } from "../../../hooks/useAxios";
import { ArtlinkProps } from "../../../components/ArtlinkCard";

/**
 *
 * Retrieves artlinks data from the server.
 *
 * @param pageSize - The number of artlinks to retrieve per page.
 * @param pageNumber - The page number of the artlinks to retrieve.
 * @param accountId - The ID of the account to retrieve artlinks for.
 * @returns A promise that resolves to the artlinks data.
 * @author AnhDH
 * @version 1.2.0
 */
export async function GetArtlinksData(
  pageSize: number,
  pageNumber: number,
  accountId: string,
  state?: number, 
  privacy?: number
) {
  try {
    const response = await axiosPrivate.get(`/accounts/${accountId}/artworks`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortColumn: "create", 
        sortOrder: "desc",
        state: state,
        privacy: privacy,
      },
    });
    if (response.status !== 200) {
      return [];
    } else {
      let artlinksData: ArtlinkProps[] = [];
      if (Array.isArray(response.data.items)) {
        artlinksData = response.data.items.map((artlink: any) => ({
          id: artlink.id,
          title: artlink.title,
          thumbnail: artlink.thumbnail,
          viewCount: artlink.viewCount,
          likeCount: artlink.likeCount,
          privacy: artlink.privacy,
          createdBy: artlink.createdBy,
          creatorFullName: artlink.account.fullname,
        }));
      }
      return artlinksData;
    }
  } catch (error) {
    return error;
  }
}

/**
 *
 * Soft deletes an artwork from the server.
 *
 * @param artworkId - The ID of the artwork to delete.
 * @returns A boolean indicating whether the artwork was successfully deleted.
 * @author AnhDH
 * @version 1.1.0
 */
export async function DeleteArtlinkData(artlinkId: string) {
  try {
    const response = await axiosPrivate.delete(`/artlinks/softdelete/${artlinkId}`);
    return response.status;
  } catch (error) {
    throw new Error("Xóa tác phẩm bị lỗi: " + error);
  }
}
