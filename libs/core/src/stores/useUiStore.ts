import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMarqueeResDto, UiState } from "@tgs-web-nx/types";
import {
  GETANNOUNCEMENT_BEGIN,
  GETANNOUNCEMENT_FAIL,
  GETANNOUNCEMENT_SUCCESS,
  GETMARQUEE_BEGIN,
  GETMARQUEE_FAIL,
  GETMARQUEE_SUCCESS,
  UiService,
} from "@tgs-web-nx/core";

export function useUiStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const ui: UiState = useSelector((state) => state.ui);

  const getMarquee = useCallback(async (language: string) => {
    dispatch({
      type: GETMARQUEE_BEGIN,
      loading: true,
    });

    try {
      //  @ts-ignore
      const response = (await UiService.GetMarquee(language)) as unknown as GetMarqueeResDto;

      if (response?.IsSuccess) {
        dispatch({
          type: GETMARQUEE_SUCCESS,
          payload: response.data,
          loading: false,
        });
      }
    } catch (e: any) {
      dispatch({
        type: GETMARQUEE_FAIL,
        loading: false,
      });
    }
  }, []);

  const getAnnouncement = useCallback(async (language: string) => {
    dispatch({
      type: GETANNOUNCEMENT_BEGIN,
      loading: true,
    });

    try {
      //  @ts-ignore
      const response = (await UiService.GetMarquee(language)) as unknown as GetMarqueeResDto;

      if (response.IsSuccess) {
        dispatch({
          type: GETANNOUNCEMENT_SUCCESS,
          payload: response.data,
          loading: false,
        });
      }
    } catch (e: any) {
      dispatch({
        type: GETANNOUNCEMENT_FAIL,
        loading: false,
      });
    }
  }, []);

  return {
    ui,
    getMarquee,
    getAnnouncement,
  };
}
