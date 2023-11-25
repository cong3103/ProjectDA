import React, { useEffect } from "react";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordValidation } from "../../Components/Validation/userValidation";
import { useForm } from "react-hook-form";
import { InlineError } from "../../Components/Notifications/Error";
import { changePasswordAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
function Password() {
  const dispatch = useDispatch()
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userChangePassword
  );
  // validete user
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data));
  }

  // useEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess, isError, message, reset, dispatch]);


  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="w-full">
          <Input
            label="Previous Password"
            placeholder="********"
            type="password"
            bg={true}
            name="oldPassword"
            register={register("oldPassword")}

          />
          {errors.oldPassword && <InlineError text={errors.oldPassword.message} />}
        </div>
        <div className="w-full">
          <Input
            label="New Password"
            placeholder="********"
            type="password"
            bg={true}
            name="newPassword"
            register={register("newPassword")}

          />
          {errors.newPassword && <InlineError text={errors.newPassword.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Confirm Password"
            placeholder="********"
            type="password"
            bg={true}
            name="confirmPassword"
            register={register("confirmPassword")}

          />
          {errors.confirmPassword && <InlineError text={errors.confirmPassword.message} />}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            {
              isLoading ? "Changing..." : "Change Password"
            }
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Password;
