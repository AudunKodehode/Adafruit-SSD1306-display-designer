.net WindowsForms app: 
Applcation to design layout and style on SSD1306 along with Arduino code.

![App]([http://url/to/img.png](https://github.com/AudunKodehode/Adafruit-SSD1306-display-designer/blob/main/Preview.png?raw=true))




Arduino: 


Code to develop and preview content on SSD1306 display using serial.
#include <Adafruit_GFX.h>  
#include <Adafruit_SSD1306.h> 
Both available from arduino library manager

Drawing Commands


dp - Draw Pixel
Command Format: dp+x, y, c
Description: Draw a single pixel at the specified coordinates with the given color.
Example: dp10,10,1 will draw a white pixel at coordinates (10, 10).
          
dc - Draw Circle
Command Format: dc+x, y, r, c
Description: Draw a filled circle with a specified radius and color at the specified coordinates.
Example: dc10,10,5,1 will draw a white filled circle with a radius of 5 pixels at coordinates (10, 10).
          
dr - Draw Rectangle
Command Format: dr+x, y, w, h, r, c
Description: Draw a filled rectangle with rounded corners at the specified coordinates. w and h represent the width and height, r is the corner radius, and c is the color.
Example: dr10,10,30,20,5,1 will draw a white filled rectangle with rounded corners (radius 5 pixels) at coordinates (10, 10) with a width of 30 pixels and a height of 20 pixels.
          
dl - Draw Line
Command Format: dl+x1, y1, x2, y2, c
Description: Draw a straight line from (x1, y1) to (x2, y2) in the specified color.
Example: dl10,10,50,30,1 will draw a straight line in white color from (10, 10) to (50, 30).
          
cd - Clear Display
Command Format: cd
Description: Clear the entire display.
Example: cd will clear the display.
          
id - Invert Display
Command Format: id
Description: Invert the display colors.
Example: id will invert the display colors.
          
nl - Newline
Command Format: nl
Description: Move the cursor to the next line.
Example: nl will move the cursor to the next line.
          
ct - Continue Text
Command Format: ct+text
Description: Display the provided text without a newline.
Example: ctHello, World! will display "Hello, World!" without moving to the next line.
          
nt - Print Text with Newline
Command Format: nt+x, y, c, tz, text
Description: Print the specified text at the given coordinates (x, y) with the specified color (c) and text size (tz). The text will be followed by a newline character.
Example: nt10,10,1,12,Hello, World! will print "Hello, World!" in white color at coordinates (10, 10) with a text size of 12 pixels and move to the next line.
          
pt - Print Text
Command Format: pt+x, y, c, tz, text
Description: Print the specified text at the given coordinates (x, y) with the specified color (c) and text size (tz). No newline is added after the text.
Example: pt10,10,1,12,Hello, World! will print "Hello, World!" in white color at coordinates (10, 10) with a text size of 12 pixels.
          
dt - Draw Triangle
Command Format: dt+x0, y0, x1, y1, x2, y2, c
Description: Draw a filled triangle with vertices at (x0, y0), (x1, y1), and (x2, y2) in the specified color (c).
Example: dt10,10,20,20,30,10,1 will draw a white filled triangle with vertices at (10, 10), (20, 20), and (30, 10).
          
db - Draw Bitmap
Command Format: db+x, y, w, h, c, data
Description: Draw a bitmap image at the specified coordinates. w and h represent the width and height of the image, c is the color, and data contains the image data.
Example: db10,10,64,64,1,0101010101... will draw a bitmap image with a width of 64 pixels, a height of 64 pixels, in white color, and the provided data.
