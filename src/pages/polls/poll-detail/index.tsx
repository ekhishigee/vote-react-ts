import React, { useContext, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import { PollContext, PollProvider } from "../../../contexts/poll"

const PollDetail: React.FC = () => {
  const { id } = useParams();
  const { pollDetail, getPollDetail } = useContext(PollContext);

  useEffect(() => {
    if (id) {
      getPollDetail(+id)
    }
  }, [])

  return (
    <Row justify="center" align="middle">
      <Col span={22}>
        <Row justify="center">
          <h1>Poll Detail</h1>
        </Row>
      </Col>
      <Col span={22} className="polls-wrapper">
        <Row justify="center">
          {pollDetail && pollDetail.question}?
        </Row>
      </Col>
    </Row>
  )
}

export const PollDetailPage: React.FC = () => (
  <PollProvider>
    <PollDetail />
  </PollProvider>
)
