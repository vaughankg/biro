require 'pp'

str = "function drawShape(ctx, xoff, yoff) {
  ctx.beginPath();
  ctx.moveTo(152 + xoff, 333 + yoff);
  ctx.bezierCurveTo(156 + xoff, 261 + yoff, 164 + xoff, 174 + yoff, 198 + xoff, 173 + yoff);
  ctx.bezierCurveTo(263 + xoff, 172 + yoff, 256 + xoff, 221 + yoff, 256 + xoff, 321 + yoff);
  ctx.bezierCurveTo(256 + xoff, 331 + yoff, 248 + xoff, 152 + yoff, 312 + xoff, 173 + yoff);
  ctx.bezierCurveTo(363 + xoff, 190 + yoff, 358 + xoff, 265 + yoff, 357 + xoff, 329 + yoff);
  ctx.stroke();
}"

point1_reg = /ctx.moveTo\((?<c1p1x>\d+) \+ xoff, (?<c1p1y>\d+) \+ yoff\);/

curves_reg = /ctx.bezierCurveTo\((?<p1x>\d+) \+ xoff, (?<p1y>\d+) \+ yoff, (?<p2x>\d+) \+ xoff, (?<p2y>\d+) \+ yoff, (?<p3x>\d+) \+ xoff, (?<p3y>\d+) \+ yoff\);/

p1_match = str.match(point1_reg)
curves_scan =  str.scan(curves_reg)

last_point = [ p1_match[1], p1_match[2] ].map{|x| x.to_i}

letter = curves_scan.map do |curve|
  c = curve.map{|x| x.to_i }.each_slice(2).to_a
  c.insert(0, last_point)
  last_point = c.last
  c
end

pp letter

