import nationalities from "@/constants/nationalities"

export default function nationalitiesFilter(e) {
  let nat = nationalities.filter((n) => n.CountryCode === e);
  return nat[0].Nationality;
}
