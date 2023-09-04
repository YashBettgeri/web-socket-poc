var newOrderForm = document.getElementsByClassName("new-order-window")[0];
        var isDown = false;
        var offset = null;

        
        
        newOrderForm.addEventListener('mousedown', function(e) {
            isDown = true;
            offset = [
                newOrderForm.offsetLeft - e.clientX,
                newOrderForm.offsetTop - e.clientY
            ];

        }, true);

        newOrderForm.addEventListener('mouseup', function() {
            isDown = false;
        }, true);

        newOrderForm.addEventListener('mousemove', function(event) {
            
            event.preventDefault();
            if (isDown) {
                
                mousePosition = {

                    x : event.clientX,
                    y : event.clientY

                };
                newOrderForm.style.left = (mousePosition.x +offset[0]) + 'px';
                newOrderForm.style.top  = (mousePosition.y +offset[1]) + 'px';

                
            }
        }, true);

        function send(){            
            const newOrderForm = document.getElementById('new-order-form');
            newOrderForm.addEventListener('submit',function(e){
            e.preventDefault();

            const formData = new FormData(newOrderForm);



            var URL = "https://httpbin.org/post?";
            for(item of formData){
                URL += item[0] + '=' + item[1] + '&';

            }
            URL = URL.slice(0,-1);
            console.log(URL);
    

            //fetch(URL,{method: "POST"});

            
            var xhr = new XMLHttpRequest();
            console.log("XML HTTP request created");
            // var url = "https://httpbin.org/post";
            // var url = "https://jsonplaceholder.typicode.com/posts";
            xhr.open("POST",URL,true);
            console.log("HTTP POST connection opened");
            xhr.setRequestHeader("Content-Type","application/json");
            console.log("content type succcessfully set as application/json");
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    var json = JSON.parse(xhr.responseText);
                    console.log("data received was : "+ json);
                }
            }
            xhr.send();
            console.log("data sent successfully");
        });
        }

        document.querySelector("#new-order-button").addEventListener("click",function(){
            document.querySelector(".new-order-window").classList.add("active");
        });

        document.querySelector("#close-button").addEventListener("click",function(){
            document.querySelector(".new-order-window").classList.remove("active");
        });

        document.querySelector("#submit-button").addEventListener("click",function(){
            document.querySelector(".new-order-window").classList.remove("active");
        });