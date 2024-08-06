var sender = setInterval(function(){
    if (document.getElementsByClassName("disable-browser-ptr").length ==0||document.getElementsByClassName("prevent-scrolling").length > 0){
        return;
    }
    if (document.getElementsByClassName("fixed-container top").length>0 && document.getElementsByClassName("internal-input").length>0){
        if (document.getElementsByClassName("fixed-container top")[0].textContent.includes("Postingan") && document.getElementsByClassName("internal-input")[0].value.length > 5){

            if(jitter == 0){
  closer()
                return;
            }
            /*Tampilkan TOMBOL SEND*/
            /*Tekan TOMBOL SEND*/
            if( document.getElementsByClassName("internal-input")[0].value.length > 1){
                document.querySelectorAll("[aria-label='Posting komentar']")[0].click()
                console.log("Comment Terkirim");
                clearInterval(sender);
                jitter = 0
                closer()


            }


            /*Tekan TOMBOL SEND*/
        }
    }
},0)
