export default function ContactItem({ stor, deleteContact }) {
    return(
        <div>
          <table className="table">
            <thead>
              <tr className="align-middle text-center">
                <th scope="col">icon</th>
                <th scope="col">Name</th>
                <th scope="col">Phone/Email</th>
                <th scope="col">Status</th>
                <th scope="col">Gender</th>
                <th scope="col">Edit/Del</th>
              </tr>
            </thead>
            <tbody>
            {stor.map(contact => (
               <tr key={contact.id} className="align-middle text-center">
                <td scope="row">
                  <img className="rounded-circle" src={`https://randomuser.me/api/portraits/${contact.gender}/${contact.avatar}.jpg`} alt="" />
                </td>
                <td className="fs-4">{contact.firstName}<br/>{contact.lastName}</td>
                <td className="fs-5">{contact.phone}<br/>{contact.email}</td>
                <td className="fs-5 text-uppercase fw-bold">{contact.status}</td>
                <td className="fs-5 text-uppercase fw-bold">{contact.gender}</td>
                <td>
                  <button>edit</button>
                  <button onClick={() => deleteContact(contact.id)}>del</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
    )
}