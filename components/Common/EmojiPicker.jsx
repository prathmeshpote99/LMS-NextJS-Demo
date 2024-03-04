import { useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import grinning from '../../assets/images/icons/grinning.png'

const EmojiPicker = ({ handleEmojiClick }) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false)

  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible((state) => !state)
  }

  const handleEmojiSelection = (e) => {
    const sym = e.unified.split('_')
    const codeArray = []
    sym.forEach((el) => codeArray.push('0x' + el))

    const emoji = String.fromCodePoint(...codeArray)

    handleEmojiClick(emoji)
  }

  return (
    <span
      style={{
        cursor: 'pointer',
        position: 'absolute',
        top: '20px',
        right: '20px',
      }}
    >
      <img src={`${grinning}`} alt="" onClick={toggleEmojiPicker} />
      {isEmojiPickerVisible ? (
        <div
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 1000,
          }}
        >
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelection}
            maxFrequentRows={0}
            theme="dark"
          />
        </div>
      ) : null}
    </span>
  )
}

export default EmojiPicker
