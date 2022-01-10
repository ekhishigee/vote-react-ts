import React, { createContext, useCallback, useEffect, useState } from "react";
import { get } from "../../helpers/api.helpers";
import { Poll } from "../../models/poll.model";

export const usePolls = () => {
  const [polls, setPolls] = useState<Poll[]>()
  const getPolls = async () => {
    try {
      const response = await get('/poll')
      console.log()
      setPolls(response)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    polls,
    getPolls: useCallback(getPolls, []),
  }
}

export const usePollDetail = () => {
  const [pollDetail, setPollDetail] = useState<Poll>()
  const getPollDetail = async (id: number) => {
    try {
      const response = await get(`/poll/${id}`)
      console.log()
      setPollDetail(response)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    pollDetail,
    getPollDetail: useCallback(getPollDetail, []),
  }
}

type PollContextType = {
  polls: Poll[] | any;
  getPolls: () => void;
  pollDetail: Poll | any;
  getPollDetail: (id: number) => void;
};

export const PollContext = createContext<PollContextType>({
  polls: [],
  getPolls: () => {},
  pollDetail: null,
  getPollDetail: (id: number) => {},
});

export const PollProvider: React.FC = ({ children }) => {
  const [polls, setPolls] = useState<Poll[]>()
  const [pollDetail, setPollDetail] = useState<Poll>()
  const { polls: p, getPolls } = usePolls()
  const { pollDetail: pd, getPollDetail } = usePollDetail()

  useEffect(() => {
    if (p) {
      setPolls(p)
    }
  }, [p])

  useEffect(() => {
    if (pd) {
      setPollDetail(pd)
    }
  }, [pd])

  return (
    <PollContext.Provider value={{ polls, getPolls, pollDetail, getPollDetail }}>
      {children}
    </PollContext.Provider>
  )
}
