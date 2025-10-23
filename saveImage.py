import urllib.request
imgURL = "https://www.dropbox.com/scl/fi/56x7232ergtv5c176qr53/cmh_wayfinding_bg.png?rlkey=dah8xxansk2syozv5nskewr5n&dl=1"

urllib.request.urlretrieve(imgURL, "C:/Users/Legion/Documents/Neuronic/liveImages/test.png")

print('done')