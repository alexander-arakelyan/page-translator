package org.bambrikii.lang.pagetranslator.export.evernote;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverLogLevel;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;
import java.text.MessageFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class EvernoteCommand {
    private ChromeDriver driver;
    private EvernoteNotesWriter writers;
    private String usr;
    private String pw;

    public EvernoteCommand init(String username, String password) throws IOException {
        this.usr = username;
        this.pw = password;

        var now = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        this.writers = new EvernoteNotesCompositeWriter()
                .json("evernote-notes-" + now + ".json")
                .log("evernote-notes-" + now + ".log")
                .open();
        var url = EvernoteCommand.class.getResource("/chromedriver");
        var path = url.getFile();
        System.setProperty("webdriver.chrome.driver", path);

        var options = new ChromeOptions();
        options.setLogLevel(ChromeDriverLogLevel.ALL);
        options.setBinary("/opt/google/chrome/chrome");
        this.driver = new ChromeDriver(options);

        driver.get("https://www.evernote.com");

        return this;
    }

    public EvernoteCommand login() {
        click("//*/p[@class='login-cta']");
        getSendKeys(new By.ByXPath("//*[@id='username']"), usr);
        click("//*[@id='loginButton']");

        var password = new By.ByXPath("//*[@id='password']");
        wait(password, 50);
        getSendKeys(password, pw);
        click("//*[@id='loginButton']");

        return this;
    }

    public EvernoteCommand am() {
        var shortcuts = new By.ByXPath("//*[@id='shortcuts-item-label']");
        wait(shortcuts, 50);
        driver.findElement(shortcuts).click();

        var am = new By.ByXPath("//*[@id='qa-NAV_SHORTCUT_Shortcut:98e6ccd4-2689-4977-a8e0-ccebe46eca56']");
        wait(am, 50);
        driver.findElement(am).click();

        return this;
    }

    public EvernoteCommand listNotes() {
        Queue<WebElement> queue = new LinkedList<>();
        queue.addAll(findElements(driver));
        while (!queue.isEmpty()) {
            var elem = queue.poll();
            elem.click();
            try {
                var iFrame = new By.ByXPath("//*[@id=\"qa-NOTE_EDITOR\"]/div[2]/iframe");
                wait(iFrame, 25);
                switchToIFrame(iFrame);
                var title = getValue("/html/body/en-noteheader/div/div[2]/textarea");
                var content = getText("//*[@id='en-note']");
                writers.append(title, content);
                switchToDefault();
                System.out.println(MessageFormat.format("{0}: {1}", title, content));
            } catch (Exception ex) {
                ex.printStackTrace();
            }

            if (queue.isEmpty()) {
                nextNotes(queue, elem);
            }
        }

        return this;
    }

    private void nextNotes(Queue<WebElement> queue, WebElement lastElem) {
        var notesSidebar = new By.ByXPath("//*[@id=\"qa-NOTES_SIDEBAR\"]/div[2]/div/div/div");
        wait(notesSidebar, 25);
        new Actions(driver)
                .moveToElement(driver.findElement(notesSidebar))
                .sendKeys(Keys.DOWN)
                .perform();
        var elems = findElements(driver);
        if (elems.isEmpty()) {
            return;
        }
        int pos = 0;
        for (int i = 0; i < elems.size(); i++) {
            var elem = elems.get(i);
            if (elem.equals(lastElem)) {
                pos = i + 1;
                break;
            }
        }
        for (int i = pos; i < elems.size(); i++) {
            var elem2 = elems.get(i);
            queue.add(elem2);
        }
    }

    private static List<WebElement> findElements(WebDriver driver) {
        var notes = new By.ByXPath("//*[@id='qa-NOTES_SIDEBAR']/div[2]/div/div/div/div/div");
        new WebDriverWait(driver, Duration.ofSeconds(50)).until(ExpectedConditions.visibilityOfElementLocated(notes));
        return driver.findElements(notes);
    }

    private void getSendKeys(By.ByXPath xPath, String value) {
        driver.findElement(xPath).sendKeys(value);
    }

    private void wait(WebElement element, int seconds) {
        new WebDriverWait(driver, Duration.ofSeconds(seconds)).until(ExpectedConditions.visibilityOf(element));
    }

    private void wait(By.ByXPath element, int seconds) {
        new WebDriverWait(driver, Duration.ofSeconds(seconds)).until(ExpectedConditions.visibilityOfElementLocated(element));
    }

    private void click(String xPath) {
        driver.findElement(new By.ByXPath(xPath)).click();
    }

    private WebDriver switchToDefault() {
        return driver.switchTo().defaultContent();
    }

    private WebDriver switchToIFrame(By.ByXPath xPath) {
        return driver.switchTo().frame(driver.findElement(xPath));
    }

    private String getText(String xPath) {
        return driver.findElement(new By.ByXPath(xPath)).getText();
    }

    private String getValue(String xPath) {
        return driver.findElement(new By.ByXPath(xPath)).getAttribute("value");
    }

    public EvernoteCommand close() throws IOException {
        writers.close();
        driver.close();
        driver.quit();

        return this;
    }
}
