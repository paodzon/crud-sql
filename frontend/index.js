

const submitForm =async() =>{
    
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try{
        const response = await fetch('http://localhost:8080/addpost',
        {
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                title:title,
                body:body
            })
        })

        const data = await response.json()

        console.log(data)

        window.location.reload()
        
    }catch(err){
        console.log(err)
    }


    

}

// const getForms = () => {
//     const tableBody = document.getElementById('table-body');
    
//   fetch("http://localhost:8080/getposts", {
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//         let tableContent = '';
//         data.posts.forEach((item) =>{
//             tableContent += `<tr onclick="getForm(${item.id})">`
//             tableContent += `<td>${item.title}</td><td>${item.body}</td><td><button onclick="updateForm(${item.id})">EDIT</button><button onclick="deleteForm(${item.id})">DELETE</button></td>`
//             tableContent += '</tr>'
//         })
        
//         tableBody.innerHTML = tableContent
//     })
//     .catch((err) => console.log(err));
// };


const getForms = async() =>{

    try {
      const tableBody = document.getElementById("table-body");

      const response = await fetch("http://localhost:8080/getposts", {
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      let tableContent = "";
      data.posts.forEach((item) => {
        tableContent += `<tr onclick="getForm(${item.id})">`;
        tableContent += `<td>${item.title}</td><td>${item.body}</td><td><button onclick="updateForm(${item.id})">EDIT</button><button onclick="deleteForm(${item.id})">DELETE</button></td>`;
        tableContent += "</tr>";
      });

      tableBody.innerHTML = tableContent;
    } catch (err) {
        console.log(err)
    }
}



const getForm = (id)=>{
    fetch(`http://localhost:8080/getpost/${id}`).then(res => res.json()).then(data =>{
        document.getElementById('title').value = data.title;
        document.getElementById('body').value = data.body;
        
    }).catch(err =>console.log(err))
}

const deleteForm = (id) => {
  fetch(`http://localhost:8080/deletepost/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

    window.location.reload()
};

const updateForm = (id) =>{
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    fetch(`http://localhost:8080/updatepost/${id}`,{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            body: body
        })
    }).then(res => res.json()).then(data => console.log(data)).catch(err => err) 
    window.location.reload()
    
}

window.onload = async() => {
    getForms()
};

