import WishlistCityPage from "@/modules/wishlist/pages/WishlistCityPage";

export default async function Page({ params }) {
  const { cityId } = await params;

  return <WishlistCityPage cityId={cityId} />;
}
