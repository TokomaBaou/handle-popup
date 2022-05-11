import { useCallback, useMemo, useState } from "react";
interface TabDef {
  /** TODO: 商材区分ID、暫定値 */
  commodityId: "01" | "09" | "20" | null;
  display: string;
}

interface State {
  /** 表示対象年 */
  targetYear: number | null;
  /** 表示対象商材 */
  targetCommodityId: TabDef["commodityId"];
  /** targetPurchaseHistories の表示開始位置 */
  displayBeginIndex: number;

  /**ポップアップ */
  popupOpen: boolean;
}
/**"20"を付与された商材タブを初期表示する */
const initialState: State = {
  targetYear: null,
  targetCommodityId: "20",
  displayBeginIndex: 0,
  popupOpen: false
};

export const Handle = () => {
  /** システム年 */
  const nowYear = useMemo(() => new Date().getFullYear(), []);
  const [state, setState] = useState<State>({
    ...initialState,
    targetYear: nowYear
  });
  /** どの商材を選択しているかをハンドリングする*/
  /**TabDef それぞれに付与したcommodityIdを引数にsetState関数を生成 */
  const onSwitchTab = useCallback((commodityId) => {
    setState((state) => ({
      ...state,
      displayBeginIndex: 0,
      targetCommodityId: commodityId
    }));
  }, []);
  /**どの年次タブを選択しているかをハンドリングする */
  const onSwitchYearTab = useCallback((year: number) => {
    setState((state) => ({ ...state, displayBeginIndex: 0, targetYear: year }));
  }, []);

  const handlePopup = useCallback((open: boolean) => {
    setState((state): State => ({ ...state, popupOpen: true }));
  }, []);

  /**mode選択 */

  return {
    onSwitchTab,
    onSwitchYearTab,
    handlePopup
  } as const;
};
