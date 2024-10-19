import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import { Button, FormField, FormInput, GridColumn } from "semantic-ui-react";
import { mealTypeOptions } from "../../constant/common.constant";
import { imageUpload } from "../../utils/cloud-method";
import AsToast from "../common/AsToast";
import { AsForm, AsInput, AsSelect, AsTextArea } from "../common/form";

const MealDetails = () => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate: mutationImageUpload, isPending: isImageUploadPending } =
    useMutation({
      mutationFn: imageUpload,
      onSuccess: (data) => {
        setImageUrl(data?.secure_url);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const handleMealSubmit = (data) => {
    if (!file) {
      setFileError(true);
      return;
    }
    if (file.size > 5000000)
      return AsToast.error(
        <div className="errorToast">
          <FiTrash2 /> &nbsp;<span>File Size Must Be Less Than 5mb.</span>
        </div>
      );
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "asfood");
    formData.append("cloud_name", "diqirua3k");
    mutationImageUpload(formData);

    // mutateCsv(formData)
  };
  return (
    <div className="previewLayout">
      <h3 className="mb-5">Add Meal</h3>
      <AsForm control={control} errors={errors} size="large">
        <AsInput
          maxLength={30}
          name="name"
          required
          label="Meal Name"
          placeholder="Enter meal name"
        />
        <AsSelect
          maxLength={100}
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
        />
        <GridColumn mobile={16} computer={8}>
          <FormField required>
            <label>Select Image</label>
            <FormInput
              data-test-id="import-file-input"
              // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel, .csv"
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
        </GridColumn>
        {/* <AsInput
          name="price"
          required
          label="Meal Price"
          placeholder="Enter a price"
        /> */}
        <AsTextArea
          name="description"
          required
          label="Enter description"
          placeholder="Enter meal description"
        />

        {/* <GridColum width={16}> */}

        {/* </GridColum> */}
      </AsForm>
      <Button
        className="mt-5"
        loading={isImageUploadPending}
        onClick={handleSubmit(handleMealSubmit)}
        primary
        // fluid
      >
        Submit
      </Button>
    </div>
  );
};

export default MealDetails;
