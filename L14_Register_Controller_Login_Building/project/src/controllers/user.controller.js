import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Notes
  /*
-> get user details from frontend
-> validation - not empty
-> check if user already exist : username, email
-> check for image and avatar
-> upload image to cloudinary
-> create user object - create entry in db
-> remove password and refreshToken from response
-> check from user created or not
-> return res
*/

  const { username, fullName, email, password } = req.body;

  if (
    [username, fullName, email, password].some((field) => field.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist.");
  }

  const avatarLocalPath = req.files?.photo[0]?.path;
  const coverImageLocalPath = req.files?.bgImg[0]?.path;

  console.log(avatarLocalPath, coverImageLocalPath);

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required.");
  if (!coverImageLocalPath) throw new ApiError(400, "CoverImage is required.");

  // upload image on cloudinary
  const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath);

  if (!(avatarUrl && coverImageUrl))
    throw new ApiError(400, "Avatar or CoverImage required.");

  const user = await User.create({
    fullName,
    avatar: avatarUrl.url,
    coverImage: coverImageUrl.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await user
    .findById(user._id)
    .select("-password -refreshToken");

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user.");

  // finally send response
  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully!"));
});

export { registerUser };
