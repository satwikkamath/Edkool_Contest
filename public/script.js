

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

document.getElementById("button-addon2").addEventListener('click', function () {
    const bookName = document.getElementById("bookName").value;
    // console.log(bookName);
    const mainFunc = async () => {
        const res= document.getElementById("res");
        let result =``;
        let sendData = {
            title: bookName,

        }
        let bookList = await getBookList(sendData)
        let pag1=[];
        let pag2=[];
        let pag3=[];

        for(i=0;i<9;i++)
            pag1[i]=bookList.items[i];

        for(i=9,j=0;i<18;i++,j++)
            pag2[j]=bookList.items[i];

        for(i=18,j=0;i<27;i++,j++)
            pag3[j]=bookList.items[i];

            console.log(pag1);
            console.log(pag2);
            console.log(pag3);

        pag1.forEach(ele =>{

            let imgurl = ele.volumeInfo.imageLinks.thumbnail;
            let name = ele.volumeInfo.title;
            let subName
            if(ele.volumeInfo.subtitle)
                subName = ele.volumeInfo.subtitle;
            else
                subName = "No information available"
            let author = ele.volumeInfo.authors[0];
            let readurl= ele.volumeInfo.previewLink;

            console.log(imgurl);
            console.log(name);
            console.log(author);
            console.log(readurl);
            result+= `
            
            <div class="col-sm-12 col-md-6 col-lg-4 my-3">
                                <div class="card justify-content-center">
                                    <img class="mx-auto mt-4"
                                        src="${imgurl}"
                                        alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title noto text-center ">${name}</h5>
                                        <p class="card-text sans text-center ">${subName}</p>
                                        <p class="card-text sans text-center ">Author : ${author}</p>
                                        <a class="btn btn-primary mx-2 sans" href="${readurl}">My List</a>
                                    </div>
                                </div>
                            </div>
            
            
            `

            res.innerHTML= result;
        })
    }

    mainFunc()
})



