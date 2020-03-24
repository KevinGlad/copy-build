This module will copy the contents of an npm project's build directory
to a destination directory.
The destination directory must exist but it will be emptied prior to
recieving the contents of the build directory.

Instructions

Clone this repository to a permenate location on your computer
change directory into the newly created location that contains the project files
run npm link

for every project you want to use this module in modify the package.json to include
a postbuild script, replacing destination with the exact path of the destination directory

"postbuild": "copy-build destination"