<template>
  <div class="otp-verification-page bg-light min-h-100vh d-flex flex-column">
    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container d-flex justify-content-center">
        <div class="auth-card shadow-sm overflow-hidden bg-white rounded-5 border-0">
          <div class="row g-0">
            <!-- Left Side: Image (Visible on Desktop) -->
            <div class="col-lg-6 d-none d-lg-block">
              <div class="auth-img-wrapper h-100 position-relative">
                <img src="/assets/images/thumbanils/auth.jpg" alt="OTP Verification" class="auth-image">
                <div class="auth-overlay"></div>
              </div>
            </div>

            <!-- Right Side: OTP Input -->
            <div class="col-lg-6">
              <div class="auth-form-wrapper p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                <div class="text-center mb-5">
                  <h2 class="auth-title">Verify OTP</h2>
                  <p class="text-muted small mt-2">We've sent a 6-digit code to your phone number. Please enter it below to continue.</p>
                </div>

                <form @submit.prevent="handleVerify" class="otp-form">
                  <!-- OTP Digits Container -->
                  <div class="otp-container d-flex justify-content-between mb-5">
                    <input
                      v-for="(digit, index) in 6"
                      :key="index"
                      :id="'otp-' + index"
                      type="text"
                      maxlength="1"
                      v-model="otpDigits[index]"
                      @input="handleInput($event, index)"
                      @keydown.backspace="handleBackspace($event, index)"
                      @paste="handlePaste"
                      class="otp-input text-center fw-bold"
                      inputmode="numeric"
                      required
                    >
                  </div>

                  <!-- Resend Timer -->
                  <div class="text-center mb-5">
                    <p v-if="timeLeft > 0" class="text-muted small">
                      Resend code in <span class="text-brand fw-bold">{{ formatTime(timeLeft) }}</span>
                    </p>
                    <button v-else type="button" @click="handleResend" class="btn-link-brand border-0 bg-transparent fw-bold small">
                      Resend OTP Code
                    </button>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="primary-btn verify-btn py-3 justify-content-center fw-bold w-100" :disabled="isSubmitting || !isOtpComplete">
                    <i v-if="isSubmitting" class="fa-solid fa-circle-notch fa-spin me-2"></i>
                    Verify & Proceed
                  </button>

                  <!-- Back Link -->
                  <div class="text-center mt-5">
                    <nuxt-link to="/forgot-password" class="text-muted small fw-bold text-decoration-none">
                      <i class="fa-solid fa-arrow-left me-1"></i> Back to Forgot Password
                    </nuxt-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Toast Notification -->
    <Transition name="toast-pop">
      <div v-if="showSuccessToast" class="success-toast">
        <div class="d-flex align-items-center gap-3">
          <div class="toast-icon bg-success-light">
             <i class="fa-solid fa-circle-check text-success"></i>
          </div>
          <div class="d-flex flex-column">
             <span class="fw-bold text-dark">Success!</span>
             <span class="text-muted small">{{ toastMessage }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const otpDigits = ref(['', '', '', '', '', ''])
const isSubmitting = ref(false)
const showSuccessToast = ref(false)
const toastMessage = ref('')
const timeLeft = ref(120) // 2 minutes

let timer = null

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== '')
})

const startTimer = () => {
  if (timer) clearInterval(timer)
  timeLeft.value = 120
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const handleInput = (e, index) => {
  const val = e.target.value
  if (val && index < 5) {
    document.getElementById(`otp-${index + 1}`).focus()
  }
}

const handleBackspace = (e, index) => {
  if (!otpDigits.value[index] && index > 0) {
    document.getElementById(`otp-${index - 1}`).focus()
  }
}

const handlePaste = (e) => {
  e.preventDefault()
  const pasteData = e.clipboardData.getData('text').slice(0, 6)
  if (/^\d+$/.test(pasteData)) {
    pasteData.split('').forEach((char, i) => {
      otpDigits.value[i] = char
    })
    document.getElementById(`otp-${Math.min(pasteData.length, 5)}`).focus()
  }
}

const handleResend = () => {
  toastMessage.value = 'A new OTP has been sent to your phone.'
  showSuccessToast.value = true
  startTimer()
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

const handleVerify = async () => {
  isSubmitting.value = true
  // Simulate verification
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  toastMessage.value = 'Verification successful! Redirecting...'
  showSuccessToast.value = true
  isSubmitting.value = false

  setTimeout(() => {
    showSuccessToast.value = false
    navigateTo('/reset-password')
  }, 2000)
}

onMounted(() => {
  startTimer()
  // Focus first input
  document.getElementById('otp-0')?.focus()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.otp-verification-page { background: #fdfdfd; }
.otp-input { width: 50px; height: 60px; font-size: 24px; border-radius: 12px; border: 1.5px solid #ececec; background: #f9f9f9; transition: all 0.3s ease; }
.otp-input:focus { border-color: var(--brand); background: #fff; box-shadow: 0 0 0 4px rgba(69, 40, 41, 0.1); outline: none; }
.btn-link-brand { color: var(--brand); cursor: pointer; text-decoration: none; }
.btn-link-brand:hover { text-decoration: underline; }
@media (max-width: 576px) {
    .otp-input { width: 40px; height: 50px; font-size: 20px; }
}
</style>
