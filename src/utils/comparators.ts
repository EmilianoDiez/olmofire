interface Companion {
  id: string;
  name: string;
  dni: string;
}

export const areCompanionsEqual = (
  companions1: Companion[],
  companions2: Companion[]
): boolean => {
  if (companions1.length !== companions2.length) return false;

  const sortedCompanions1 = [...companions1].sort((a, b) => a.id.localeCompare(b.id));
  const sortedCompanions2 = [...companions2].sort((a, b) => a.id.localeCompare(b.id));

  return sortedCompanions1.every((companion, index) => 
    companion.id === sortedCompanions2[index].id &&
    companion.name === sortedCompanions2[index].name &&
    companion.dni === sortedCompanions2[index].dni
  );
};