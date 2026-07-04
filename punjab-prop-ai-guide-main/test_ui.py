from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
wait = WebDriverWait(driver, 10)

# 🔥 OPEN SIGNUP DIRECTLY
driver.get("http://localhost:8080/signup")

print("Opened Signup Page")

# Fill signup form
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Your full name']")))

driver.find_element(By.CSS_SELECTOR, "input[placeholder='Your full name']").send_keys("Kartik")
driver.find_element(By.CSS_SELECTOR, "input[placeholder='you@example.com']").send_keys("kartik@test.com")
driver.find_element(By.CSS_SELECTOR, "input[placeholder='Min. 6 characters']").send_keys("123456")
driver.find_element(By.CSS_SELECTOR, "input[placeholder='Re-enter password']").send_keys("123456")

# Click Create Account
driver.find_element(By.XPATH, "//button[contains(text(),'Create Account')]").click()

print("Signup attempted")

time.sleep(3)

# 🔥 GO TO LOGIN (important)
driver.get("http://localhost:8080/login")

# Fill login
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='you@example.com']")))

driver.find_element(By.CSS_SELECTOR, "input[placeholder='you@example.com']").send_keys("kartik@test.com")
driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys("123456")

# Click Sign In
driver.find_element(By.XPATH, "//button[contains(text(),'Sign In')]").click()

print("Login done")

time.sleep(5)

input("Press Enter to close...")
driver.quit()