package project.lms.enumstatus;

public enum Nationality {
	Domestic("내국인"),
	Foreigner("외국인");

    private final String desc;

    private Nationality(String desc) {
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }
}