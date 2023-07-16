

const getBookList = async (sendData) => {
    let options = {
            method: "POST",
            headers: {
                    "Content-type": "application/json"
            },
            body: JSON.stringify(sendData),
    }
    let p = await fetch('/getBooks', options)
    let response = await p.json()
    return response
}

document.getElementById("btn").addEventListener('click', function () {
    const bookName = document.getElementById("bookName").value;
    const res= document.getElementById("res");
    let string ="";
    // console.log(bookName);
    const mainFunc = async () => {
        let sendData = {
            title: bookName,

        }
        let bookList = await getBookList(sendData)
        let pag1=[];
        let pag2=[];
        let pag3=[];

    }

    mainFunc()
})



