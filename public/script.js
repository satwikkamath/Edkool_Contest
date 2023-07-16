

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
        const res1= document.getElementById("res1");
        const res2= document.getElementById("res2");
        const res3= document.getElementById("res3");
        const pag= document.getElementById("pag");
        let result1 =``;
        let result2 =``;
        let result3 =``;
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



        pag1.forEach(ele =>{

            let imgurl = ele.volumeInfo.imageLinks.thumbnail;
            let name = ele.volumeInfo.title;
            let subName
            if(ele.volumeInfo.subtitle)
                subName = ele.volumeInfo.subtitle;
            else
                subName = "No information available"
            
            let author
            if(ele.volumeInfo.authors)
            author = ele.volumeInfo.authors[0];
            else
            author ="No info available"
            let readurl= ele.volumeInfo.previewLink;


            result1+= `
            
            <div class="col-sm-12 col-md-6 col-lg-4 my-3 d-flex align-items-stretch">
                                <div class="card text-center">
                                    <img class="mx-auto mt-4"
                                        src="${imgurl}"
                                        alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title noto text-center ">${name}</h5>
                                        <p class="card-text sans text-center ">${subName}</p>
                                        <p class="card-text sans text-center ">Author : ${author}</p>
                                        <a class="btn btn-primary mx-2 sans" href="${readurl}" target="_blank">Read Online</a>
                                    </div>
                                </div>
                            </div>
            
            
            `

        })
        pag2.forEach(ele =>{

            let imgurl = ele.volumeInfo.imageLinks.thumbnail;
            let name = ele.volumeInfo.title;
            let subName
            if(ele.volumeInfo.subtitle)
                subName = ele.volumeInfo.subtitle;
            else
                subName = "No information available"
            
            let author
            if(ele.volumeInfo.authors)
            author = ele.volumeInfo.authors[0];
            else
            author ="No info available"
            let readurl= ele.volumeInfo.previewLink;


            result2+= `
            
            <div class="col-sm-12 col-md-6 col-lg-4 my-3 d-flex align-items-stretch">
                                <div class="card text-center">
                                    <img class="mx-auto mt-4"
                                        src="${imgurl}"
                                        alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title noto text-center ">${name}</h5>
                                        <p class="card-text sans text-center ">${subName}</p>
                                        <p class="card-text sans text-center ">Author : ${author}</p>
                                        <a class="btn btn-primary mx-2 sans" href="${readurl}" target="_blank">Read Online</a>
                                    </div>
                                </div>
                            </div>
            
            
            `

        })
        pag3.forEach(ele =>{

            let imgurl = ele.volumeInfo.imageLinks.thumbnail;
            let name = ele.volumeInfo.title;
            let subName
            if(ele.volumeInfo.subtitle)
                subName = ele.volumeInfo.subtitle;
            else
                subName = "No information available"
            
            let author
            if(ele.volumeInfo.authors)
            author = ele.volumeInfo.authors[0];
            else
            author ="No info available"
            let readurl= ele.volumeInfo.previewLink;


            result3+= `
            
            <div class="col-sm-12 col-md-6 col-lg-4 my-3 d-flex align-items-stretch">
                                <div class="card text-center">
                                    <img class="mx-auto mt-4"
                                        src="${imgurl}"
                                        alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title noto text-center ">${name}</h5>
                                        <p class="card-text sans text-center ">${subName}</p>
                                        <p class="card-text sans text-center ">Author : ${author}</p>
                                        <a class="btn btn-primary mx-2 sans" href="${readurl}" target="_blank">Read Online</a>
                                    </div>
                                </div>
                            </div>
            
            
            `
        })


        pag.innerHTML=`<nav aria-label="Page navigation example" class="d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#findbook" onClick="leftArrow()" id="leftArrow" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a href="#findbook" onclick="pagNo1();" id="pagNo1" class="page-link blue">1</a></li>
          <li class="page-item"><a href="#findbook" onclick="pagNo2();" id="pagNo2" class="page-link">2</a></li>
          <li class="page-item"><a href="#findbook" onclick="pagNo3();" id="pagNo3" class="page-link">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#findbook" onClick="rightArrow()" id="rightArrow" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>`

      res1.innerHTML= result1;
      res2.innerHTML= result2;
      res3.innerHTML= result3;
    }

    mainFunc()
})



// pagination

let c=1;


function pagNo1(){
    document.getElementById("res1").classList.remove("disp-none")
    document.getElementById("res2").classList.add("disp-none")
    document.getElementById("res3").classList.add("disp-none")

    document.getElementById("pagNo1").classList.add("blue")
    document.getElementById("pagNo2").classList.remove("blue")
    document.getElementById("pagNo3").classList.remove("blue")

    c=1;
}
function pagNo2(){
    document.getElementById("res1").classList.add("disp-none")
    document.getElementById("res2").classList.remove("disp-none")
    document.getElementById("res3").classList.add("disp-none")

    document.getElementById("pagNo1").classList.remove("blue")
    document.getElementById("pagNo2").classList.add("blue")
    document.getElementById("pagNo3").classList.remove("blue")
    c=2
}
function pagNo3(){
    document.getElementById("res1").classList.add("disp-none")
    document.getElementById("res2").classList.add("disp-none")
    document.getElementById("res3").classList.remove("disp-none")

    document.getElementById("pagNo1").classList.remove("blue")
    document.getElementById("pagNo2").classList.remove("blue")
    document.getElementById("pagNo3").classList.add("blue")
    c=3
}

function leftArrow()
{
    if(c==1)
    {
        pagNo3();
    }
    else if(c==2)
    {
        pagNo1();
    }
    else
    {
        pagNo2();
    }
}
function rightArrow()
{
    if(c==1)
    {
        pagNo2();
    }
    else if(c==2)
    {
        pagNo3();
    }
    else
    {
        pagNo1();
    }
}

