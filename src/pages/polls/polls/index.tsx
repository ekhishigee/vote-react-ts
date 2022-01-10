import React, { useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import { PollContext, PollProvider } from "../../../contexts/poll"
import { Poll } from "../../../models/poll.model";
import './index.less'

const PollList: React.FC = () => {
  const navigate = useNavigate()
  const { polls, getPolls } = useContext(PollContext);

  useEffect(() => {
    getPolls()
  }, [])

  const goPoll = (id: number) => {
    navigate(`poll-detail/${id}`)
  }

  return (
    <Row justify="center" align="middle">
      <Col span={22}>
        <Row justify="center">
          <h1>Polls</h1>
        </Row>
      </Col>
      <Col span={22} className="polls-wrapper">
        <Row justify="center">
          {
            polls?.map((poll: Poll) => (
              <Col className="poll-wrapper" span={22} onClick={() => goPoll(poll.id)}>
                <span className="poll-item" key={`poll-${poll.id}`}>{poll.question}?</span>
              </Col>
            ))
          }
        </Row>
      </Col>
    </Row>
  )
}

export const PollsPage: React.FC = () => (
  <PollProvider>
    <PollList />
  </PollProvider>
)
