import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Button } from "semantic-ui-react";
import { mealTypeOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
// import { imageUpload } from "../../utils/cloud-method";
import { useNavigate, useParams } from "react-router-dom";
import { mealValidationSchema } from "../../validations/meal.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput, AsSelect, AsTextArea } from "../common/form";
import { useEffect } from "react";

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
          <span>Meal created successfully!</span>
        </div>
      );
      navigate("/meal");
    },
  });

  const {
    data: mealDetails,
    isFetching: isMealDetailsFetching,
    isSuccess: getSingleMealSuccess,
  } = useQuery({
    queryKey: ["meal"],
    queryFn: () => client(`meal/${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (getSingleMealSuccess && mealDetails) {
      const { name, price, description, type } = mealDetails;
      reset({
        name,
        price,
        description,
        type,
      });
    }
  }, [getSingleMealSuccess && mealDetails]);

  const handleMealSubmit = (data) => {
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
            <AsInput
              maxLength={30}
              name="name"
              required
              label="Meal Name"
              placeholder="Enter meal name"
            />
            <AsSelect
              name="type"
              required
              label="Meal Type"
              placeholder="Select meal type"
              options={mealTypeOptions}
            />
            <AsInput
              name="price"
              required
              label="Meal Price"
              placeholder="Enter a price"
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
            <AsTextArea
              maxLength={100}
              name="description"
              required
              label="Enter description"
              placeholder="Enter meal description"
            />
          </AsForm>
          <Button
            className="mt-5"
            loading={isAddMealPending}
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
