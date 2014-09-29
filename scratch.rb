require 'pp'

str = "function drawShape(ctx, xoff, yoff) {
  ctx.beginPath();
  ctx.moveTo(360 + xoff, 122 + yoff);
  ctx.bezierCurveTo(348 + xoff, 113 + yoff, 235 + xoff, 123 + yoff, 250 + xoff, 206 + yoff);
  ctx.bezierCurveTo(253 + xoff, 221 + yoff, 287 + xoff, 373 + yoff, 272 + xoff, 374 + yoff);
  ctx.bezierCurveTo(233 + xoff, 377 + yoff, 283 + xoff, 288 + yoff, 211 + xoff, 287 + yoff);
  ctx.bezierCurveTo(196 + xoff, 287 + yoff, 365 + xoff, 262 + yoff, 350 + xoff, 264 + yoff);
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

