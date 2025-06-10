import { useParams } from 'react-router-dom';

export default function UpdateContact() {
  const { id } = useParams();

  return (
    <div>
      <h1>Update Contact</h1>
    </div>
  );
}
