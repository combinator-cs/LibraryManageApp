// import axios from "axios";
// import React from "react";
// import { apis } from '../Utils/Constants';


// export default function AddMember() {

//     const [name, setName] = React.useState();
//     const [mob_number, setMobNumber] = React.useState();
//     const [email_id, setEmailId] = React.useState();
//     const [address, setAddress] = React.useState();

//     const submitHandler = (event) => {
//         event.preventDefault();
//         axios.post(apis.ADD_MEMBER_URL, {
//             name: name,
//             mob_number: mob_number,
//             email_id: email_id,
//             address: address
//         })
//             .then((response) => {
//                 console.log(response.data)
//                 setName("")
//                 setMobNumber("")
//                 setEmailId("")
//                 setAddress("")
//                 alert("Member added!")
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };

//     return (
//         <div id="customForm">
//             <form onSubmit={submitHandler}>
//                 <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="Name"
//                     maxLength="50"
//                     value={name}
//                     onChange={e => setName(e.target.value)}
//                 />
//                 <input
//                     id="mob_number"
//                     name="mob_number"
//                     type="number"
//                     placeholder="Mobile Number"
//                     maxLength="10"
//                     value={mob_number}
//                     onChange={e => setMobNumber(e.target.value)}
//                 />
//                 <input
//                     id="email_id"
//                     name="email_id"
//                     type="text"
//                     placeholder="Email"
//                     maxLength="50"
//                     value={email_id}
//                     onChange={e => setEmailId(e.target.value)}
//                 />
//                 <input
//                     id="address"
//                     name="address"
//                     type="text"
//                     placeholder="Address"
//                     maxLength="100"
//                     value={address}
//                     onChange={e => setAddress(e.target.value)}
//                 />
//                 <input id="submit" type="submit" value="ADD MEMBER" />
//             </form>
//         </div >
//     );
// }
