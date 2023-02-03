import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { EventField, edit, reset } from "../../store/eventFields";

export const useEventFields = () => {
  const eventFields = useSelector((state: RootState) => state.eventFields);
  const dispatch = useDispatch();

  return {
    eventFields,
    edit: useCallback(
      (field: EventField) => {
        dispatch(edit(field));
      },
      [dispatch]
    ),
    reset: useCallback(() => dispatch(reset()), [dispatch]),
  };
};
