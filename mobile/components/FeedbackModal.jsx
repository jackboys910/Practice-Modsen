import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { submitFeedback } from '../store/slices/feedbackSlice'

const { width, height } = Dimensions.get('window')

const FeedbackModal = ({ visible, onClose }) => {
  const [isUseful, setIsUseful] = useState(null)
  const [suggestion, setSuggestion] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (isUseful === null) return

    try {
      await dispatch(
        submitFeedback({
          isUseful,
          suggestion,
        })
      ).unwrap() // Unwrap для обработки ошибок

      onClose()
    } catch (err) {
      console.error('Error submitting feedback:', err.message)
      setError(err.message)
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Feedback</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>❌</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={styles.questionText}>
              Do you find our site useful?
            </Text>
            <View style={styles.options}>
              <TouchableOpacity
                style={[
                  styles.option,
                  isUseful === true && styles.optionSelected,
                  isUseful === true && styles.usefulOption,
                ]}
                onPress={() => setIsUseful(true)}
              >
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  isUseful === false && styles.optionSelected,
                  isUseful === false && styles.notUsefulOption,
                ]}
                onPress={() => setIsUseful(false)}
              >
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.textAreaLabel}>What can we improve?</Text>
            <TextInput
              style={styles.textArea}
              value={suggestion}
              onChangeText={setSuggestion}
              placeholder="Your feedback..."
              multiline
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                isUseful === null && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isUseful === null}
            >
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: width * 0.85,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 180,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 20,
  },
  body: {
    marginTop: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  option: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  optionSelected: {
    borderColor: '#000',
  },
  usefulOption: {
    backgroundColor: 'green',
  },
  notUsefulOption: {
    backgroundColor: 'red',
  },
  optionText: {
    color: 'black',
    fontWeight: 'bold',
  },
  textAreaLabel: {
    marginVertical: 10,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    textAlignVertical: 'top',
  },
  footer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
  },
})

export default FeedbackModal
