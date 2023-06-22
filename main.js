let inp = document.getElementById("input");
let feed = document.getElementById("feed");
let btn = document.getElementById("btn");
let fullname;
let feedback;
let a;
let data;

// sumit button function

btn.addEventListener("click", (e) => {
    // console.log("hi");
    fullname = inp.value.trim();
     console.log(fullname);
    feedback = feed.value.trim().split(" ");
     console.log(feedback);
    a = [];

    for (i = 0; i < feedback.length; i++) {
        // console.log(feedback[i]);
        if (feedback[i] !== "") {
            a.push(feedback[i]);
        }
    }
    let userfeed = a.join(" ");
    // console.log(userfeed);

    if (inp.value == "" || feed.value == "") {
        alert("Fullname and feedback should not be empty");
    }

    // postapi function

    async function postapi() {


        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": fullname,
                "feedback": userfeed
            }),
        };

        let postdata = await fetch("https://hello-21a12-default-rtdb.asia-southeast1.firebasedatabase.app/user.json", settings)

        let data = await postdata.json();
         console.log(data);
    }
    postapi();

    inp.value = "";
    feed.value = "";

    alert("Your feedback has been successfully submitted");
})

// getapi function

let getbtn = document.getElementById("getbtn");

getbtn.addEventListener("click", getapi);

async function getapi() {

    let fetchdata = await fetch("https://hello-21a12-default-rtdb.asia-southeast1.firebasedatabase.app/user.json");

    data = await fetchdata.json();
    // console.log(data);

    let table = document.getElementById("table");

    function row() {
        table.innerHTML = "";

        for (let i in data) {
            // console.log(i);
            // console.log(data[i]);;
            const { feedback, name } = data[i]
                // console.log(feedback, name);

            let row = `<tr>
        <td>${name}</td>
        <td>${feedback}</td>
        <td>
        <button style="width: fit-content; padding:5px;" onclick="edit('${i}')">Edit</button>
        <button style="width: fit-content; padding:5px;" onclick="delapi('${i}')">Delete</button>
        </td
        </tr>`

            table.innerHTML = table.innerHTML + row;

        }
    }
    row();
}

// deleteAPI function


async function delapi(id) {

    const settings = { method: 'DELETE' }

    let fetchdel = await fetch(`https://hello-21a12-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`, settings)
    let data = await fetchdel.json();
    // console.log("hello");
    getapi();
}

// To edit, to get specified id data in form

let userObject = {}

function edit(id) {

    const { feedback, name } = data[id];
    // console.log(id);

    inp.value = name;
    feed.value = feedback;
    userObject = {
        id: id,
        name: name,
        feedback: feedback
    }
}

//editAPI

function onEdit() {
    async function getObj(obj) {
        let { id, name, feedback } = obj
        name = inp.value
        feedback = feed.value

        const settings = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "feedback": feedback
            }),
        };

        let putdata = await fetch(`https://hello-21a12-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`, settings)

        let dat = await putdata.json();
        console.log(dat);

    }

    getObj(userObject)

    // console.log(getObj(userObject))
}