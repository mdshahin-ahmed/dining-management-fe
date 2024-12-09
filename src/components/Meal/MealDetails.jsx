import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Button } from "semantic-ui-react";
import {
  mealNameOptions,
  orderTypeOptions,
} from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
// import { imageUpload } from "../../utils/cloud-method";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mealValidationSchema } from "../../validations/meal.schema";
import AsToast from "../common/AsToast";
import { AsEditor, AsForm, AsInput, AsSelect } from "../common/form";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};

const MealDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const client = useClient();
  // const [file, setFile] = useState(null);
  // const [fileError, setFileError] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      price: "",
      stock: "",
      description: "",
    },
    resolver: joiResolver(mealValidationSchema),
  });

  // const { mutate: mutationImageUpload, isPending: isImageUploadPending } =
  //   useMutation({
  //     mutationFn: imageUpload,
  //     onSuccess: (res) => {
  //       addMealMutate({ ...data, image: res?.secure_url });
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });
  const { mutate: addMealMutate, isPending: isAddMealPending } = useMutation({
    mutationFn: (data) =>
      client(id ? `meal/${id}` : "meal", { data, method: id ? "PUT" : "POST" }),
    onSuccess: () => {
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>
            {id ? "Meal Updated Successfully!" : "Meal Added Successfully!"}
          </span>
        </div>
      );
      !id && navigate("/manage-meal");
    },
  });

  const { data: mealDetails, isFetching: isMealDetailsFetching } = useQuery({
    queryKey: ["meal"],
    queryFn: () => client(`meal/${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (mealDetails && id) {
      const { name, price, stock, description, type } = mealDetails;
      reset({
        name,
        price,
        stock,
        description,
        type,
      });
    }
  }, [mealDetails]);

  const handleMealSubmit = (data) => {
    // console.log(data);
    addMealMutate(data);
    // setData(data);
    // if (!file) {
    //   setFileError(true);
    //   return;
    // }
    // if (file.size > 5000000)
    //   return AsToast.error(
    //     <div className="errorToast">
    //       <FiTrash2 /> &nbsp;<span>File Size Must Be Less Than 5mb.</span>
    //     </div>
    //   );
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("upload_preset", "asfood");
    // formData.append("cloud_name", "diqirua3k");
    // mutationImageUpload(formData);
  };

  return (
    <div className="previewLayout">
      <h3 className="mb-5">{id ? "Update Meal" : "Add Meal"}</h3>

      {isMealDetailsFetching ? (
        <span>Loading...</span>
      ) : (
        <>
          <AsForm control={control} errors={errors} size="large">
            <AsSelect
              name="name"
              required
              label="Meal Name"
              placeholder="Select meal name"
              options={mealNameOptions}
            />
            <AsSelect
              name="type"
              required
              label="Meal Type"
              placeholder="Select meal type"
              options={orderTypeOptions}
            />
            <AsInput
              name="price"
              required
              label="Meal Price"
              placeholder="Enter a price"
              type="number"
            />
            <AsInput
              name="stock"
              required
              label="Meal Stock"
              placeholder="Enter number of stock"
              type="number"
            />
            {/* <GridColumn mobile={16} computer={8}>
          <FormField required>
            <label>Select Image</label>
            <FormInput
              className="import-file-input"
              accept="image/*"
              type="file"
              error={
                fileError && {
                  content: "Please select a csv file",
                }
              }
              onChange={(e) => {
                setFileError(false);
                if (e.target.files[0].size < 5000000) {
                  setFile(e.target.files[0]);
                } else {
                  AsToast.error(
                    <div className="errorToast">
                      <FiTrash2 /> &nbsp;
                      <span>File Size Must Be Less Than 5mb.</span>
                    </div>
                  );
                }
              }}
            />
          </FormField>
        </GridColumn> */}
            <AsEditor
              name="description"
              label="Description"
              required
              modules={modules}
            />

            {/* <AsTextArea
              maxLength={100}
              name="description"
              required
              label="Enter description"
              placeholder="Enter meal description"
            /> */}
          </AsForm>
          <Button
            className="mt-3"
            loading={isAddMealPending}
            disabled={isAddMealPending}
            onClick={handleSubmit(handleMealSubmit)}
            primary
          >
            {id ? "Update" : "Submit"}
          </Button>
        </>
      )}
    </div>
  );
};

export default MealDetails;
