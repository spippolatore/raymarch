// Generated by CoffeeScript 1.6.3
var face, intbound, mod, raycast, signum;

mod = function(value, modulus) {
  return (value % modulus + modulus) % modulus;
};

intbound = function(s, ds) {
  if (ds < 0) {
    return intbound(-s, -ds);
  } else {
    return (1 - (mod(s, 1))) / ds;
  }
};

signum = function(x) {
  if (x > 0) {
    return 1;
  } else {
    if (x < 0) {
      return -1;
    } else {
      return 0;
    }
  }
};

face = [0, 0, 0];

module.exports = raycast = function(origin, direction, resolve, callback, radius) {
  var dx, dy, dz, stepX, stepY, stepZ, tDeltaX, tDeltaY, tDeltaZ, tMaxX, tMaxY, tMaxZ, x, y, z;
  if (radius == null) {
    radius = 30;
  }
  x = Math.floor(origin[0]);
  y = Math.floor(origin[1]);
  z = Math.floor(origin[2]);
  dx = direction[0], dy = direction[1], dz = direction[2];
  stepX = signum(dx);
  stepY = signum(dy);
  stepZ = signum(dz);
  tMaxX = intbound(origin[0], dx);
  tMaxY = intbound(origin[1], dy);
  tMaxZ = intbound(origin[2], dz);
  tDeltaX = stepX / dx;
  tDeltaY = stepY / dy;
  tDeltaZ = stepZ / dz;
  if (dx === 0 && dy === 0 && dz === 0) {
    return callback(500);
  }
  radius /= Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
  while (true) {
    if (resolve(x, y, z)) {
      return callback(null, x, y, z, face);
    }
    if (tMaxX < tMaxY) {
      if (tMaxX < tMaxZ) {
        if (tMaxX > radius) {
          break;
        }
        x += stepX;
        tMaxX += tDeltaX;
        face[0] = -stepX;
        face[1] = 0;
        face[2] = 0;
      } else {
        if (tMaxZ > radius) {
          break;
        }
        z += stepZ;
        tMaxZ += tDeltaZ;
        face[0] = 0;
        face[1] = 0;
        face[2] = -stepZ;
      }
    } else {
      if (tMaxY < tMaxZ) {
        if (tMaxY > radius) {
          break;
        }
        y += stepY;
        tMaxY += tDeltaY;
        face[0] = 0;
        face[1] = -stepY;
        face[2] = 0;
      } else {
        if (tMaxZ > radius) {
          break;
        }
        z += stepZ;
        tMaxZ += tDeltaZ;
        face[0] = 0;
        face[1] = 0;
        face[2] = -stepZ;
      }
    }
  }
  return callback(404);
};
