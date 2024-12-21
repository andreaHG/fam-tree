import FamilyTree from "../components/FamilyTreeChart";
import { useAirtableFamilyTree } from "../hooks/useAirtableFamilyTree";

function FamilyTreePage() {
  const { familyMembers, loading } = useAirtableFamilyTree();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {familyMembers ? (
        <>
          <h2>Still in Development 🚧</h2>
          <FamilyTree data={familyMembers} />
        </>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default FamilyTreePage;
