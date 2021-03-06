var app = {};

app.image = $('#image');
app.myBtn = document.getElementById('myBtn');
app.aspect_ratio_image = 0;
app.aspect_ratio_user = 0;
app.showImage = $('#show_image');
app.showImg = $('.show_img');
app.showImgCanvas = $('.show_img_canvas');  
app.req_height = 0;
app.req_width = 0;
app.req_aspect_ratio = document.getElementById('req_aspect_ratio');
app.fileInfo = document.getElementById('fileInfo');
app.imageShrink = document.getElementById('imageShrink');
app.ctx = (app.showImgCanvas)[0].getContext('2d');

app.readImageFile = function (file) {
    app.reader = new FileReader(); // CREATE AN NEW INSTANCE.

    app.reader.onload = function (e) {
        app.img = new Image();      
        app.img.src = e.target.result;
        app.showImage.attr('src', app.img.src);

        app.img.onload = function () {
            app.w = this.width;
            app.h = this.height;
            app.aspect_ratio_image = app.w/app.h;
            app.aspect_ratio_image = app.aspect_ratio_image.toFixed(2);
            app.fileInfo.innerHTML = app.fileInfo.innerHTML + '<br /> ' +
                    'Width: <b>' + app.w + '</b> <br />' +
                    'Height: <b>' + app.h + '</b> <br />' +
                    'aspectRatio: <b>' + app.aspect_ratio_image + '<b> <br />';
        }
    };
    app.reader.readAsDataURL(file.files[0]);
    app.inputValues();
}

app.inputValues = function () {
    app.myBtn.addEventListener('click', function() {
        app.req_height = document.getElementById('req_height').value;
        app.req_width = document.getElementById('req_width').value;
        app.aspect_ratio_user = app.req_width/app.req_height;
        app.aspect_ratio_user = app.aspect_ratio_user.toFixed(2);
        app.req_aspect_ratio.setAttribute('placeholder',app.aspect_ratio_user);
        app.calculator();
      });
}

app.calculator = function () {
    if(app.aspect_ratio_user === app.aspect_ratio_image) {
        console.log('equal to case');
        app.imageShrink.innerHTML = app.imageShrink.innerHTML + '<br /> ' +
        'Aspect Ratio has been same so Image has been shrinked as per the required size';
        app.showImg.attr('src', app.img.src);
        app.showImg.attr('width', app.req_width);
        app.showImg.attr('height', app.req_height);
    }

    else if(app.aspect_ratio_user >= app.aspect_ratio_image) {
        console.log('greater than case');
        //window.onload = function() {
            console.log('Bansal');
            app.showImgCanvas.attr('width', app.req_width);
            app.showImgCanvas.attr('height', app.req_height);        
            app.ctx.drawImage(app.showImage[0], 0, 0);
            //app.showImgCanvas.attr('src', app.img.src);
            
        //}
    }

    else if(app.aspect_ratio_user <= app.aspect_ratio_image) {
        console.log('less than case');
        window.onload = function() {
            app.ctx.drawImage(app.showImgCanvas, 10, 10);
            app.showImgCanvas.attr('src', app.img.src);
            app.showImgCanvas.attr('width', app.req_width);
            app.showImgCanvas.attr('height', app.req_height);
        }
    }
}

app.image.change(function() {
    app.readImageFile(this);
});
