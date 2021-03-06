// Each letter is comprised of 4 quadratic bezier curves. The end point of each curve is the start point of the next one, thus a letter is one continuous line.

var biro = biro || {};

biro.letters = {
  'Nil': [
    [ [300, 250], [300, 250], [300, 250], [300, 250] ],
    [ [300, 250], [300, 250], [300, 250], [300, 250] ],
    [ [300, 250], [300, 250], [300, 250], [300, 250] ],
    [ [300, 250], [300, 250], [300, 250], [300, 250] ]
  ],
  'a': [
    [ [376, 120], [333, 58 ], [248, 95 ], [232, 161] ],
    [ [232, 161], [228, 176], [279, 213], [315, 214] ],
    [ [315, 214], [367, 215], [376, 176], [378, 139] ],
    [ [378, 139], [381, 108], [408, 240], [403, 226] ]
  ],
  'b': [
    [ [246, 91 ], [246, 76 ], [245, 320], [247, 335] ],
    [ [247, 335], [249, 354], [253, 208], [345, 221] ],
    [ [345, 221], [456, 237], [355, 367], [341, 372] ],
    [ [341, 372], [303, 385], [246, 374], [247, 335] ]
  ],
  'c': [[[381, 158], [362, 108], [291, 113], [263, 114]],
  [[263, 114], [230, 115], [129, 138], [128, 204]],
  [[128, 204], [127, 290], [174, 311], [220, 321]],
  [[220, 321], [307, 340], [382, 319], [378, 284]]],
  'd': [[[359, 59], [359, 44], [432, 301], [363, 359]],
 [[363, 359], [344, 375], [286, 377], [258, 361]],
 [[258, 361], [189, 322], [214, 275], [220, 261]],
 [[220, 261], [256, 177], [383, 252], [368, 253]]],
  'e': [[[182, 227], [269, 231], [350, 252], [357, 188]],
 [[357, 188], [369, 80], [261, 72], [184, 161]],
 [[184, 161], [135, 218], [135, 257], [180, 294]],
 [[180, 294], [239, 342], [327, 343], [359, 325]]],
  'f': [[[360, 122], [348, 113], [235, 123], [250, 206]],
 [[250, 206], [253, 221], [287, 373], [272, 374]],
 [[272, 374], [233, 377], [283, 288], [211, 287]],
 [[211, 287], [196, 287], [365, 262], [350, 264]]],
  'g': [[[377, 191], [368, 221], [242, 231], [234, 186]],
 [[234, 186], [216, 84], [320, 43], [373, 110]],
 [[373, 110], [382, 122], [413, 235], [376, 315]],
 [[376, 315], [344, 384], [265, 320], [250, 318]]],
  'h': [[[218, 98], [218, 83], [227, 353], [225, 394]],
 [[225, 394], [224, 409], [246, 279], [277, 259]],
 [[277, 259], [333, 223], [370, 249], [388, 270]],
 [[388, 270], [427, 316], [414, 412], [415, 404]]],
  'i': [[[276, 129], [275, 114], [281, 221], [280, 206]],
 [[280, 206], [279, 191], [282, 249], [282, 264]],
 [[282, 264], [282, 279], [282, 299], [282, 314]],
 [[282, 314], [282, 329], [282, 336], [282, 351]]],
  'j': [[[320, 96], [319, 81], [325, 221], [324, 256]],
 [[324, 256], [324, 271], [322, 310], [313, 322]],
 [[313, 322], [302, 337], [296, 343], [266, 341]],
 [[266, 341], [251, 340], [204, 330], [196, 300]]],
  'k': [[[198, 109], [197, 94], [223, 337], [207, 350]],
 [[207, 350], [190, 364], [221, 225], [209, 234]],
 [[209, 234], [197, 243], [346, 129], [311, 155]],
 [[311, 155], [113, 302], [263, 185], [323, 339]]],
  'l': [[[200, 102], [199, 87], [203, 199], [203, 184]],
 [[203, 184], [203, 169], [204, 259], [204, 249]],
 [[204, 249], [204, 234], [200, 297], [206, 311]],
 [[206, 311], [223, 348], [282, 329], [298, 324]]],
  'm': [[[152, 333], [156, 261], [164, 174], [198, 173]],
 [[198, 173], [263, 172], [256, 221], [256, 321]],
 [[256, 321], [256, 331], [248, 152], [312, 173]],
 [[312, 173], [363, 190], [358, 265], [357, 329]]] 

}

