mod = (value, modulus) -> (value % modulus + modulus) % modulus

# smallest positive t such that s+t*ds is an integer
intbound = (s, ds) ->
  if ds < 0
    intbound -s, -ds
  else
    return (1 - (mod s, 1)) / ds

signum = (x) -> if x > 0 then 1 else (if x < 0 then -1 else 0)

face = [0, 0, 0]

module.exports = raycast = (origin, direction, resolve, callback, radius = 30) ->
  
  x = Math.floor origin[0]
  y = Math.floor origin[1]
  z = Math.floor origin[2]
  
  [dx, dy, dz] = direction
  
  stepX = signum dx
  stepY = signum dy
  stepZ = signum dz
  
  tMaxX = intbound origin[0], dx
  tMaxY = intbound origin[1], dy
  tMaxZ = intbound origin[2], dz
  
  tDeltaX = stepX / dx
  tDeltaY = stepY / dy
  tDeltaZ = stepZ / dz
  
  # TODO handle zero direction
  if dx is 0 and dy is 0 and dz is 0 then return callback 500
  
  radius /= Math.sqrt (dx * dx) + (dy * dy) + (dz * dz)
  
  while true
    
    if resolve x, y, z
      
      return callback null, x, y, z, face
    
    if tMaxX < tMaxY
      if tMaxX < tMaxZ
        break if tMaxX > radius
        
        x += stepX
        
        tMaxX += tDeltaX
        
        face[0] = -stepX
        face[1] = 0
        face[2] = 0
      else
        break if tMaxZ > radius
        
        z += stepZ
        
        tMaxZ += tDeltaZ
        
        face[0] = 0
        face[1] = 0
        face[2] = -stepZ
    else
      if tMaxY < tMaxZ
        break if tMaxY > radius
        
        y += stepY
        
        tMaxY += tDeltaY
        
        face[0] = 0
        face[1] = -stepY
        face[2] = 0
      else
        break if tMaxZ > radius
        
        z += stepZ
        
        tMaxZ += tDeltaZ
        
        face[0] = 0
        face[1] = 0
        face[2] = -stepZ
  
  return callback 404