var app = {};

app.image = $('#image');
app.myBtn = document.getElementById('myBtn');
app.aspect_ratio_image = 0;
app.aspect_ratio_user = 0;
app.showImage = $('#show_image'); 
app.req_height = 0;
app.req_width = 0;
app.req_aspect_ratio = document.getElementById('req_aspect_ratio');
app.fileInfo = document.getElementById('fileInfo');
app.imageShrink = document.getElementById('imageShrink');
app.processedImage = $('#processedImage');

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
      });
      app.calculator();   
}

// app.calculator = function () {
//     if(app.aspect_ratio_image == app.aspect_ratio_user) {
//         app.imageShrink.innerHTML = app.imageShrink.innerHTML + '<br /> ' +
//         'Aspect Ratio has been same so Image has been shrinked as per the required size';
//         app.processedImage.innerHTML = app.processedImage.innerHTML + '<br/>' +
//         '<img style= width:' app.req_width + 'height:' app.req_height + 'id:show_image>'
//     }
// }
    // app.landscape();
    // app.portrait();
    // app.square();

app.image.change(function() {
    app.readImageFile(this);
});
